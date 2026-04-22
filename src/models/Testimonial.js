import { DataTypes } from "sequelize";
import sequelize from "@/lib/db";

const Testimonial =
  sequelize.models.Testimonial ||
  sequelize.define(
    "Testimonial",
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "testimonials",
    },
  );

export default Testimonial;
