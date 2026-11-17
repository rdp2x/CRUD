import { Card } from "@/components/ui/card"
import { UserPlus } from "lucide-react"

export function EmptyState() {
  return (
    <Card className="p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <UserPlus className="w-8 h-8 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold font-heading text-foreground">No User Selected</h3>
          <p className="text-muted-foreground">Select a user from the list to view their details</p>
        </div>
      </div>
    </Card>
  )
}
