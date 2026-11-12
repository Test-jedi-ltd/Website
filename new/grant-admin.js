const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

const serviceAccount = {
  type: "service_account",
  project_id: "test-jedi-01",
  private_key_id: "d91fffe92f06294fd604cd16dae9798ea890a2ee",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDNmiVkbexiyvpF\nmy7n5RYw78LzRuySHJjO73nSxpJgLOgS+KthD+s7mrvsdd9Thh6CccmqJGnW1u4i\n4Gc+4NbVMn4WwzTmVfzZdBG+uiSe8q0g34YUSXg4vXX1ZKDdw6kpNcHVVawQcQxf\nNvO8KFE2at7TE46ZGalhxfz77EZcsOLe5RhFKYPWOw5UY4wFrR1GU0lvuzuFRrx/\n6GqkwrIGh9p44HvjbnUmKRkGdBmYK+7RDsUcBYK+BSieJjXwwIWmClmm/SUdAHrF\nrOaK7J9BJWID96Vb4VJOR67d/zKlNEXKcIz5lpXO0s1WhR8r2pME0e92LpcMqYlI\nNc4kiJaTAgMBAAECggEASHR7m+5PASvF0fTTrV4imWFNIv2KDh2szjQ/isN2vxTk\nPhdLEfwRqmInurd5Wc5ofxDJgD+v2snIhxrs15BVtTFDlRL61/dSkXFhdYTUtf0Q\nfQa4kfqoNtqxsKZjOHOk8ARlSCCWb/7e3MkZUOQmZpZ36wu304VjFzU2J7OGwk/j\n4PfUydu+IRs7zOscSs24wL0yLpmKbN+QFR3VrP3aVuYf7zEmhMTzMHpXG81Yf6o4\nzAn7VhJ0sBmL7Z29CRbVXPJ+qpA1oAI0lhS0deIBsv6Px/DNsAjFNDsjzpr6IC5G\nzxOB7E715heXN/Av3VWFlonVlfAE+TsODbhBdgF51QKBgQDxmUS8B52YyD4ShZdq\nyP2uxForFN17v0B0S6FvC2PDhwpYY9Y6MEsj1GS/DWiArqm1vccjttM1KMi0go6l\nY3OhLYL5dPdYIRx/8brGmm894YaS/kx+pqL2Jy42kr531FB3dWl6iJjbbE3jL+ow\nr4K2jraZGZ2rvTbhBjxBtTS9twKBgQDZ25RbzOxNhOXS41UNn8eeAqh8ZE1XVOWt\ngK1wNYLUkwblTP+vcR0wPSCjqRD1dhhpXgCUrOMhOPeHxnesUgAOTN5v36fhY09a\nekfg/ApDJuBZBeUVG5S0c31LsW/XauRnl6Wfmnb4+8RO+WpEhc4VM6gXY1ZmZ844\n8IGpwuYuBQKBgQCyo0tpZJAoydbrxw+gi6DXuqOZO0JRH6a+1rU08E0B5DXICXn7\naH4GriMYCQf+LieaFArM43/jzJYqsmZa7+AtiwNPBCdnaIQ0Lj6WXtZmAP2KbrGM\n7BWOwIWxIGvpGnms+onVam7rv3cPxvv4p62U4o0tQv2MYMnVNNEVHLE0nQKBgQDH\nx+AWCycLs3qaWNSPaN3CngdqAwUVuAnjgOQLyVaPn8CsGF9EwMMWkIfU7V5a6pBa\nV9TKgnzK45XDEhJ+mLfqZT16dCxcuRh1DTvLKvYyPH1xxcEdCSzmCh51gmLgtep8\nwQkmAp1lmGOeVITKD7Y7pSJZSERcJodrmcoeJle1DQKBgAlt1QS6Zh9ab5OBipZS\nNPKL++4hCoLZxtkqW0NKLOesTixL03o6p1hIELBWeyQUFdaVI9dgtZ4uOB/aCkuX\npUmVD914vQ88WaXp1GMSf5reGDNEOxOp3bsmGstUCO4BiByFbupWtoPzR12DIG/F\njYttXXn7ig7X0iNJWLq6i2ve\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@test-jedi-01.iam.gserviceaccount.com",
  "client_id": "101407164401010378455",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40test-jedi-01.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

initializeApp({
  credential: cert(serviceAccount)
});

const auth = getAuth();

async function grantAdminAccess() {
  try {
    const user = await auth.getUserByEmail('admin@testjedi.com');
    await auth.setCustomUserClaims(user.uid, { role: 'admin' });
    console.log('SUCCESS: Admin access granted to admin@testjedi.com');
    console.log('User UID:', user.uid);
    console.log('User must sign out and sign back in for changes to take effect.');
  } catch (err) {
    console.error('Error:', err.message);
    console.log('');
    console.log('Troubleshooting:');
    console.log('1. Verify the service account email has permissions');
    console.log('2. Make sure the user admin@testjedi.com exists in Firebase Auth');
    console.log('3. User must sign out and back in after this change');
  }
}

grantAdminAccess();