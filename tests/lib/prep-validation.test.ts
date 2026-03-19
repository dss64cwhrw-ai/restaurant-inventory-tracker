import { prepTaskSchema } from "@/lib/validations/prep";

describe("prep validation", () => {
  it("passes with valid input", () => {
    const result = prepTaskSchema.safeParse({
      title: "Slice tomatoes",
      station: "Cold Station",
      dueTime: "2026-03-19T09:00",
    });

    expect(result.success).toBe(true);
  });

  it("fails when title is missing", () => {
    const result = prepTaskSchema.safeParse({
      title: "   ",
      station: "Cold Station",
      dueTime: "2026-03-19T09:00",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Title is required.");
  });

  it("fails when station is missing", () => {
    const result = prepTaskSchema.safeParse({
      title: "Slice tomatoes",
      station: "   ",
      dueTime: "2026-03-19T09:00",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Station is required.");
  });

  it("fails when due time is missing", () => {
    const result = prepTaskSchema.safeParse({
      title: "Slice tomatoes",
      station: "Cold Station",
      dueTime: "",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Due time is required.");
  });

  it("fails when due time is invalid", () => {
    const result = prepTaskSchema.safeParse({
      title: "Slice tomatoes",
      station: "Cold Station",
      dueTime: "not-a-date",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe(
      "Due time must be a valid date and time.",
    );
  });
});
