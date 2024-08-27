import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

export type CardTaskProps = {
  title: string
  description: string
  isCompleted: boolean
  date: Date
}

export function CardTask({
  title,
  description,
  isCompleted,
  date,
}: CardTaskProps) {
  const formatData = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
  })

  const dateFormat = formatData.format(date)

  return (
    <Card
      data-completed={isCompleted}
      className="min-w-44 max-w-96 rounded-lg p-4 shadow-sm data-[completed='true']:border-green-500 data-[completed='true']:text-zinc-700"
    >
      <CardHeader className="flex justify-between">
        <CardTitle className="text-lg font-bold">
          {isCompleted ? <del>{title}</del> : title}
        </CardTitle>
        <CardDescription className="mt-2 text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-2 flex items-center justify-between">
        <span>Data: {dateFormat}</span>
        <span
          data-completed={isCompleted}
          className='data-[completed="true"]:text-green-500'
        >
          Status: {isCompleted ? 'Completed' : 'Pending'}
        </span>
      </CardFooter>
    </Card>
  )
}
