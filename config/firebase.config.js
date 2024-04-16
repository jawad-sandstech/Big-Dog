const firebase = require('firebase-admin');

const serviceAccount = {
  type: 'service_account',
  project_id: 'big-dog-69ff0',
  private_key_id: 'a7718d750a721334867c23345b332af1f9c6a07d',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClh46hG+JK3pCF\nH8HLSM0U6M3mtzBXpwF6S+I7pvNQidYzHi5smS6LQe3bVCCtf6TXL6ibb7QLrpoS\nTA7p0W7rR7mTqZXCk0QEKLYzszO70XcMH8aHMPaKHqLg0YVtPnwpnc0hjkjMzAya\n6zbOOKcL7y63T4xkwg7nMgavQR2eMGYqd3hfYLsNiIyKyh3hWXwAzXhROel0r+vk\n9/3y3izXYaUuFXBabJ67TI7NPRtbjMpqMjV3KM/nFau7d5/tsGFWGaP+dkKS7jcm\nlvzhC8yFfbA/iUQjn0xqzVnlk1RDy0dO53r/pC+5pIdhGeUkIx99SVAJyuh0H4Te\n9IOfwbp/AgMBAAECggEADsmGV1dYJtutFqD/CfvHiyRxyGuTBcslWaYck4gKWNm6\nnFE7UN5HIMLTm3Iitsnq97Vwa+2I39MWo0ECKaclybgoy7H5ol4CuuOVxONix4nv\nbZ8+qzMXj/OR4pQB35l8zabxyhtqeEkkn+5LtHtHiP+Yyvo8239uhcubrapOgAp3\nI+gv58Blnw1nEYibDMNLuzRdBflh/iH0yF+GyH/BrODW+mVPBkAh+WNHcyo3dBqZ\nNYgiUi6M8KX6qB9dBubCnRHIaK+H+UyQfxJFyYWOb4kh5B1upUUQIKM9BXSu65hT\n5H9DJ9V8DNn9IpcthmhwjTNoiEIntQY11pcCzeHnwQKBgQDd6a36svcY0MRR9gXi\nQYhztWCXgqBDBbOZRLYQh62Hz/1/H0Ty8i7E8iFp7BmkidhwP+cx9m1kUPFnWM7j\nfIsNma2ZSu0adeOn3r7li5yEt/QHwBw4c6+xDyNk+OnNCRindFrEteb29MNleNwo\ny+Ce5l4yyIrfEDtrU0vb0zCuHwKBgQC+9LTcPRk2qOaOtF5gqW4RIbcLpOBUrYQ4\nFBesFysOuzcHhtAl3nHFL3ocs2Fjdeu0a1n7tuokDx5OmGySJ+Mnyi/upL3M8VpF\n3xGJRGj+l5/lbsLG9CukqJsu9DIxA9zlKuTzDf1hzftFyja3i1MsK3VagPbbnBL9\nODoUpbKnoQKBgCx53EvFuK55kQ9YPr+lIMMIFC7pmFM2flN2qQLRHp98uTLUQo5q\nqaMBYF8JWe5XTlDZDe4+lJgpfOiYrQZ8/KWiKl/x22mVPSZ1B0+cVqdm8vrmrwFF\ndm4HObHQDZPxgcZ2FIceagcO8WaR/ZYTnpZaV4DYHrUsXKxbCnYpcrVDAoGAZGUT\nkZct4mb6kJyT4g4yKB+ptR2CNALmOPWXXIrxwFT9oZ9nYAGLnzhO4zgMQ9aDjd/C\n92w7vamVLY1Fx7Hg49KRUM6cW1upMoMNHTYyXWgqUN3i2ecV6wQaUp1gphR51qKu\nrHr2dK1vJkoiam191QMkN+kF4IA2G5usLZ7QRwECgYEAn9lP9i2n4UU8gVjJeAqs\nLIspl2sr6Yk7zt/4WriuhsC705IiVvIN9zPoIK1YhLIOmkCIrMj7W8OENL11CJBJ\nAWRAE9l4O0WUtOO5Urh6mjujLZ+eBWxvsgPiGzvmrtZxaixAHUXlq+hIifeWxfAk\nynge9JEIrlb/PB19P1m468M=\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-vdizz@big-dog-69ff0.iam.gserviceaccount.com',
  client_id: '107699716929676211046',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vdizz%40big-dog-69ff0.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

module.exports = firebase;
