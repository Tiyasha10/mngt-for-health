import { sql } from "drizzle-orm";
import { integer, varchar, pgTable, serial, text, timestamp, numeric  } from 'drizzle-orm/pg-core'

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  category: text("category").notNull(),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const Users = pgTable('users',{
    id: serial('id').primaryKey(),
    username: varchar("username").notNull(),
    age: integer('age').notNull(),
    location: varchar('location').notNull(),
    createdBy: varchar('created_by').notNull(),
});

export const Records = pgTable('records',{
    id: serial('id').primaryKey(),
    userId: integer('user_id').references (() => Users.id).notNull(),
    recordName: varchar('record_name').notNull(),
    analysisResult: varchar('analysis_result').notNull(),
    kanbanRecords: varchar('kanban_records').notNull(),
    createdBy: varchar('created_by').notNull(),

});

export const BMIRecords = pgTable('bmi_records', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => Users.id).notNull(),
  bmiValue: numeric('bmi_value', { precision: 5, scale: 2 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  height: numeric('height').notNull(),
  weight: numeric('weight').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  createdBy: varchar('created_by').notNull(),
});

export const ExerciseRecommendations = pgTable('exercise_recommendations', {
  id: serial('id').primaryKey(),
  bmiRecordId: integer('bmi_record_id').references(() => BMIRecords.id).notNull(),
  exerciseName: varchar('exercise_name').notNull(),
  targetArea: varchar('target_area').notNull(),
  equipment: varchar('equipment'),
  instructions: text('instructions'),
  gifUrl: text('gif_url'),
});