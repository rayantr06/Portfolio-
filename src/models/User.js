import { DataTypes } from "sequelize";
import sequelize from "@/lib/db";

const User =
  sequelize.models.User ||
  sequelize.define(
    "User",
    {
      prenom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
    },
  );

export default User;
