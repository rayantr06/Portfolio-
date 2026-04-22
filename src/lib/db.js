import "server-only";
import { Sequelize } from "sequelize";
import sqlite3 from "sqlite3";

const globalForDatabase = globalThis;

if (!globalForDatabase.__portfolioSequelize) {
  globalForDatabase.__portfolioSequelize = new Sequelize({
    dialect: "sqlite",
    dialectModule: sqlite3,
    storage: "./database.sqlite",
    logging: false,
  });
}

const sequelize = globalForDatabase.__portfolioSequelize;

export async function syncDb() {
  await import("@/models/relations");

  if (!globalForDatabase.__portfolioDbSynced) {
    await sequelize.sync();
    globalForDatabase.__portfolioDbSynced = true;
  }

  return sequelize;
}

export default sequelize;
