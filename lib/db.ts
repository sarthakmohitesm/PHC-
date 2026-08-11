import mongoose from 'mongoose';
import dns from 'dns';

// Force DNS servers to Google & Cloudflare to resolve Atlas SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.warn('DNS override failed:', e);
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sarthakam24hite_db_user:aO4Ygmq62505ZZ0S@phcl.bn6sxxu.mongodb.net/phcl?retryWrites=true&w=majority';

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
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
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
