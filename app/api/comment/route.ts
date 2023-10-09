import { redis } from "@/lib/redis";
import { nanoid } from "nanoid/non-secure";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { text, tags } = body;

    const commentId = nanoid();

    //retrieve and store comment details
    const comment = {
      text,
      tags: {
        TypeScript: true,
      },
      upvotes: 0,
      timeStamp: new Date(),
      author: req.cookies.get("userId")?.value,
    };

    await redis.json.numincrby("comment:", "$.upvotes", 1);

    // await Promise.all([
    //   redis.rpush("comments", commentId),
    //   redis.json.set(`comment:${comment}`, "$", comment),
    // ]);

    return new NextResponse("OK");
  } catch (error) {
    console.log(error);
  }
};
