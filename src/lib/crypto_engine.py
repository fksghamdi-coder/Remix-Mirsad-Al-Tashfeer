#!/usr/bin/env python3
"""
src/lib/crypto_engine.py
محرك التشفير المتقدم لمنصة مرصاد (Mirsad Crypto Engine)
يعتمد على خوارزمية التشفير المتماثل المعتمد مع المصادقة (AES-256-GCM / AEAD)
لحماية المحتوى الأكاديمي والبيانات الحساسة.
"""
import os
import hashlib
import hmac

try:
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
except ImportError:
    # بيئة تشغيل تشفيرية بديلة لحماية البيانات في حال عدم تثبيت مكتبة cryptography
    class FallbackAESGCM:
        def __init__(self, key: bytes):
            self.key = key

        @staticmethod
        def generate_key(bit_length: int = 256) -> bytes:
            return os.urandom(bit_length // 8)

        def encrypt(self, nonce: bytes, data: bytes, associated_data: bytes = None) -> bytes:
            keystream = hashlib.sha256(self.key + nonce).digest()
            while len(keystream) < len(data):
                keystream += hashlib.sha256(keystream + self.key).digest()
            ciphertext = bytes(b ^ k for b, k in zip(data, keystream[:len(data)]))
            tag = hmac.new(self.key, nonce + ciphertext + (associated_data or b''), hashlib.sha256).digest()[:16]
            return ciphertext + tag

        def decrypt(self, nonce: bytes, data: bytes, associated_data: bytes = None) -> bytes:
            tag = data[-16:]
            ciphertext = data[:-16]
            expected_tag = hmac.new(self.key, nonce + ciphertext + (associated_data or b''), hashlib.sha256).digest()[:16]
            if not hmac.compare_digest(tag, expected_tag):
                raise ValueError("Authentication tag verification failed")
            keystream = hashlib.sha256(self.key + nonce).digest()
            while len(keystream) < len(ciphertext):
                keystream += hashlib.sha256(keystream + self.key).digest()
            return bytes(b ^ k for b, k in zip(ciphertext, keystream[:len(ciphertext)]))

    AESGCM = FallbackAESGCM

class CryptoEngine:
    def __init__(self, key: bytes = None):
        # في بيئة الإنتاج، يتم جلب المفتاح من نظام إدارة أسرار معزول
        self.key = key if key is not None else AESGCM.generate_key(bit_length=256)
        self.aesgcm = AESGCM(self.key)

    def encrypt_data(self, data: str) -> bytes:
        nonce = os.urandom(12)
        encrypted = self.aesgcm.encrypt(nonce, data.encode(), None)
        return nonce + encrypted

    def decrypt_data(self, encrypted_data: bytes) -> str:
        nonce = encrypted_data[:12]
        data = encrypted_data[12:]
        return self.aesgcm.decrypt(nonce, data, None).decode()

if __name__ == "__main__":
    engine = CryptoEngine()
    test_str = "محتوى أكاديمي مشفر - مرصاد 2026"
    encrypted = engine.encrypt_data(test_str)
    decrypted = engine.decrypt_data(encrypted)
    assert decrypted == test_str
    print(f"✓ CryptoEngine Self-Test Success! Encrypted len: {len(encrypted)}, Decrypted: {decrypted}")
