import {z} from "zod"

// Premitive Data Types

const stringSchema = z.string()
const numberchema = z.number()
const booleanSchema = z.boolean()
const nullSchema = z.null()
const undefinedSchema = z.undefined()
const dateSchema = z.date()
const bigintSchema = z.bigint()

const objectSchem = z.object({
    name : z.string(),
    age : z.number()
})


const result = stringSchema.parse("hello")