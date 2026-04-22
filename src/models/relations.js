import Project from "./Project";
import Testimonial from "./Testimonial";
import User from "./User";

if (!User.associations.testimonials) {
  User.hasMany(Testimonial, { foreignKey: "userId", as: "testimonials" });
}

if (!Testimonial.associations.user) {
  Testimonial.belongsTo(User, { foreignKey: "userId", as: "user" });
}

export { Project, Testimonial, User };
