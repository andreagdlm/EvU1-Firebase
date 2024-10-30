const admin = require("firebase-admin");

// Configura credenciales con variables de entorno
const serviceAccount = {
  type: process.env.FIREBASE_TYPE || "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID || "evaluacionu1-5a929",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || "ea14aae7c2c8560b9c5f2c8c0977944200d9a876",
  private_key: process.env.FIREBASE_PRIVATE_KEY 
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') 
    : "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCUjeLHLw1cUBp+\nJNx5NWYhu8Dat8Zvztg4poAS8bko9M5o+Z/ED2aPfTLNNkd0oIq0aRUiJCTbl4Gd\nRA/KAOP0D7rMD6MP6pY7tNOxvHHwmYoPse4+uOYNfeBuDB5k0alQN0djYaI42I6c\nfKKG2mKW1tZmuDz3B87hyp/PXrfUY0EWP962DxwPIM/wiGPWwCalsmxOPGNcio7c\np1ilQvdQHLuho6oLdknxosMKr5MAN3xGojB+4rDYKXN4IThoPxzNikoTQluWPauk\nzzHFZcgEnPAp4s/NhirnGcR7YVm07m6mcqkOW+kKL4t5LcCLnSR0gjXbgb8N/hup\nTN0xA1/7AgMBAAECggEACl5DlpxX/3pPYKa1xQRVl9AkLzL5aujrmjsAufgpPX/Z\nZWYN+qykGPeBIEwdo59OEjZtW6zDIWWkwPNOcmf3Tc77pIdvQ/3SNRUzW0N1F/i9\nzceg6O7I9Uy0tjZeHrJFcdkeprb0EA/WFq6NcQHbNLG5u044YkanIu1pLWhSear4\n5Ayfrr6qUIjJBPeOF1K9RIjmpjmCFHugrnfP1OyMrXRmDWkZbXw6TOG5Aj9s9TFd\nwjlNRuon+g+TBSJR0jRfAdKBO4M7FDussBYZbPiifCfNDol9ir8bTVdQIZ7pPpGK\nzEFzhzR90idYseY650s6YIgKB8pTYKf0iRRpJDfFcQKBgQDPfyw02G0GPLQW4DiO\ndmH8othveRPmDQI6MocmyUcrkvIfrZxCANS9lBKalq0vSWG+pBoqr5ri3iwFd7Bc\nsdJU3aQPvu4rd087RaMvC30uYs8QXwrKs7G95nBVo80MLqrkfppAeA3jaEJAtMgn\nAS5hBioUTXXjDY1AchAZJ8SAMQKBgQC3R4eZFqlAVyD2avDtL6b2FgzP+qFyHLPe\noqeNOsEJI/I0eB1MdjJ0O1rIVLueWaAqfeiWr4ohxRHtDXfC84k6gKWZbwQgkc0g\nRJlv7mWd4WlsZCng/R2oAZh81QCftq0hI4QtvW4vWRfJCbu9JsI9gOnODM2yxBs0\nVgzlUAsj6wKBgHNUEfQFXwOaddZJJeY48lmDAZ1jxKWXEWfbcbcjJIWZlS36RuGA\nqL3+MSDvIq8nsEZP26NiG0qBhiI71jCPPYKh9nAyBRrvo4AkQoEBd8Bydvh4ev0T\nR3VvQXy4IF3nCmEZ5Q50K/P7nOduE9lqFKckz/qc2ysp+xqYy03QBq3hAoGBAJxO\ncKJq5SVuKTp+scJWpXmyDHNDOHTtbakt5t9XgFGfSmzdE3+mPhlKlX3MZcYCgco7\nXyVDx/ZM76DPn5evwxUVqiVUvJxaPCqM1p7THe6r0xERy3WJ6MTjt3ye281aKgTd\nGVk4+MOAo/xcRLRoXbe+Pafw22zeOqVDzfOzdAzJAoGAAaQWnqH7hgl6jesS42LL\n58IWkLCwoohlPR8cu6WOiTgrqvHXMXh2U3NmeQJPa5W57nS2C+R2fbDKfo0DugBi\nXBaNdPG24GvogLAdwzyXjfwK1LDW1FazVLbB4UdfhHhbmp66yozxbjWkzcIRPzSG\nu2mtUw1P8OJB6Xl6j8+MeKc=\n-----END PRIVATE KEY-----\n",
  client_email: process.env.FIREBASE_CLIENT_EMAIL || "firebase-adminsdk-nfgo0@evaluacionu1-5a929.iam.gserviceaccount.com",
  client_id: process.env.FIREBASE_CLIENT_ID || "114447881611439388606",
  auth_uri: process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
  token_uri: process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL || "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nfgo0%40evaluacionu1-5a929.iam.gserviceaccount.com",
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN || "googleapis.com",
};

// Inicializa Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Inicializa Firestore

module.exports = db;
