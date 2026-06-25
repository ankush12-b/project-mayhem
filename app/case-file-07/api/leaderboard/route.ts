/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { isDbAvailable, db } from '@/db'
import { leaderboard, users } from '@/db/schema'
import { desc, asc, eq } from 'drizzle-orm'

export async function GET() {
  try {
    const session = await getSession()
    const currentUserId = session?.userId

    if (isDbAvailable) {
      try {
        const ranks = await db
          .select({
            userId: leaderboard.userId,
            name: users.name,
            fragmentCount: leaderboard.fragmentCount,
            hintCount: leaderboard.hintCount,
            completionTimestamp: leaderboard.completionTimestamp,
          })
          .from(leaderboard)
          .innerJoin(users, eq(leaderboard.userId, users.id))
          .orderBy(desc(leaderboard.fragmentCount), asc(leaderboard.completionTimestamp))

        return NextResponse.json({
          live: true,
          rankings: ranks.map((r: any, i: number) => ({
            rank: i + 1,
            name: r.name,
            fragments: r.fragmentCount ?? 0,
            hints: r.hintCount ?? 0,
            isSelf: r.userId === currentUserId,
          })),
        })
      } catch (error) {
        console.error('Error fetching DB leaderboard:', error)
      }
    }

    // Demo Mode: Mock leaderboard
    const mockRankings = [
      { rank: 1, name: 'Ada W.', fragments: 9, hints: 1, isSelf: false },
      { rank: 2, name: 'Agent Leon', fragments: 8, hints: 3, isSelf: false },
      { rank: 3, name: session?.name || 'Demo Agent', fragments: session?.recovered.length || 0, hints: session?.hints || 0, isSelf: true },
      { rank: 4, name: 'Saddler_Fan', fragments: 3, hints: 6, isSelf: false },
      { rank: 5, name: 'Ramon_S', fragments: 1, hints: 12, isSelf: false },
    ]

    // Sort mock rankings
    mockRankings.sort((a, b) => {
      if (b.fragments !== a.fragments) return b.fragments - a.fragments
      return a.hints - b.hints
    })

    // Re-assign ranks
    const rankings = mockRankings.map((item, index) => ({
      ...item,
      rank: index + 1,
    }))

    return NextResponse.json({
      live: false,
      rankings,
    })
  } catch (error) {
    console.error('Leaderboard API error:', error)
    return NextResponse.json({ rankings: [] })
  }
}

