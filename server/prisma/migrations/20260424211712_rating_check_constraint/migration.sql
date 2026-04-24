-- Enforce rating range 1-5 at the database level
ALTER TABLE "ratings"
  ADD CONSTRAINT "ratings_rating_range" CHECK ("rating" >= 1 AND "rating" <= 5);
