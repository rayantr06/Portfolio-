import { DataTypes } from "sequelize";
import sequelize from "@/lib/db";

const Project =
  sequelize.models.Project ||
  sequelize.define(
    "Project",
    {
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fullDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      role: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      technologies: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      githubUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      demoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "projects",
    },
  );

export default Project;
