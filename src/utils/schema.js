import { sql } from "drizzle-orm";
import { integer, varchar, pgTable, serial, text, timestamp, numeric } from 'drizzle-orm/pg-core';

// Posts Table (if needed)
export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  category: text("category").notNull(),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Users Table (if needed)
export const Users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar("username").notNull(),
  age: integer('age').notNull(),
  location: varchar('location').notNull(),
  createdBy: varchar('created_by').notNull(),
});

// Records Table (if needed)
export const Records = pgTable('records', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => Users.id).notNull(),
  recordName: varchar('record_name').notNull(),
  analysisResult: varchar('analysis_result').notNull(),
  kanbanRecords: varchar('kanban_records').notNull(),
  createdBy: varchar('created_by').notNull(),
});

// Past Records Table (for BMI and user data)
export const pastRecords = pgTable('past_records', {
  id: serial('id').primaryKey(),
  height: numeric('height').notNull(),
  weight: numeric('weight').notNull(),
  sex: varchar('sex').notNull(),
  bmi: numeric('bmi').notNull(),
  category: varchar('category').notNull(), // Added BMI category
  createdAt: timestamp('created_at').defaultNow(),
});

// Exercises Table (for exercise recommendations)
export const exercises = pgTable('exercises', {
  id: serial('id').primaryKey(),
  exerciseName: varchar('exercise_name').notNull(),
  duration: numeric('duration').notNull(),
  caloriesBurned: numeric('calories_burned').notNull(),
  recordId: integer('record_id').references(() => pastRecords.id), // Link to past_records
  createdAt: timestamp('created_at').defaultNow(),
});