import mongoose from 'mongoose';
import dns from 'dns';

// Ensure DNS resolver uses reliable public DNS servers for Atlas SRV lookup on Windows/Node.js
export function applyCustomDns() {
  try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1', '1.0.0.1']);
    if (typeof (dns as any).setDefaultResultOrder === 'function') {
      (dns as any).setDefaultResultOrder('ipv4first');
    }
  } catch {
    // ignore if restricted
  }
}

applyCustomDns();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://sarthakam24hite_db_user:aO4Ygmq62505ZZ0S@phcl.bn6sxxu.mongodb.net/phcl?retryWrites=true&w=majority';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectDB(throwOnError = false): Promise<typeof mongoose | null> {
  applyCustomDns();

  if (cached?.conn && cached.conn.connection?.readyState === 1) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4
    };

    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('✅ MongoDB Atlas connected successfully — Database: phcl');
        return mongooseInstance;
      });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (err: any) {
    cached!.conn = null;
    cached!.promise = null;
    if (throwOnError) {
      throw err;
    }
    console.warn('❌ MongoDB Connection Failed. Using In-Memory Fallback:', err.message);
    return null;
  }

  return cached!.conn;
}

