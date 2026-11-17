interface UserStatsProps {
  totalUsers: number
}

export function UserStats({ totalUsers }: UserStatsProps) {
  return (
    <div className="mb-6">
      <p className="text-sm text-muted-foreground mb-1">Total Users</p>
      <p className="text-2xl font-bold font-heading text-foreground">{totalUsers}</p>
    </div>
  )
}
