import { PostCreateButton } from '@/components/post-create-button';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import EntryTable from '../entry-table';
import { Input } from '@/components/ui/input';
import { QuickEntryForm } from '@/components/quick-entry';
import { EntryAddDialog } from '@/components/entry-add-modal';
import { EditEntryDialog } from '@/components/edit-entry-dialog';
import { GoalsForm } from '@/components/goals-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CaloriesFull } from '@/types/models';
import { Separator } from '@/components/ui/separator';

export default async function PlaygroundPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const goals = await db.goals.findFirst({
    where: {
      userId: user.id
    }
  });

  const calories = await db.calories.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      logDate: 'asc'
    }
  });

  let previousWeight: number | undefined;

  const res: CaloriesFull[] = calories.map((calorie, index) => {
    let weightDayDiff: number | undefined;

    if (
      previousWeight !== undefined &&
      calorie.weight !== null &&
      calorie.weight > 0
    ) {
      weightDayDiff = calorie.weight - previousWeight;
    }

    previousWeight = calorie.weight ?? undefined;

    const totalCalories =
      (calorie.breakfast ?? 0) +
      (calorie.lunch ?? 0) +
      (calorie.dinner ?? 0) +
      (calorie.snacks ?? 0);

    return {
      ...calorie,
      totalCalories,
      weightDayDiff,
      weightGoalDiff: (calorie.weight ?? 0) - (goals?.weight ?? 0),
      calorieGoalDiff: goals?.totalCals ? totalCalories - goals.totalCals : 0
    };
  });

  return (
    <main className="w-full p-4 md:p-10 mx-auto max-w-7xl">
      <Tabs defaultValue="journal">
        <TabsList className="mb-3">
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>
        <TabsContent value="journal">
          <h2 className="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Fitness Journal
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-3">
            Goal setting anchors your fitness journey, giving direction and
            purpose. By tracking daily metrics, you&apos;re not just measuring
            progress—you&apos;re ensuring success.
          </p>
          <Separator className="my-3" />
          <EntryTable entries={res} />
        </TabsContent>
        <TabsContent value="goals">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6 pl-0 pt-0">
              <h2 className="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                The Power of Goal Setting
              </h2>
              <p className="leading-7 [&:not(:first-child)]:mt-3">
                Goal setting anchors your fitness journey, giving direction and
                purpose. By tracking daily metrics, you&apos;re not just
                measuring progress—you&apos;re ensuring success.
              </p>
            </div>
            <Card className="md:w-1/2">
              <CardHeader>
                <CardTitle>Your Goals</CardTitle>
                <CardDescription>Set your goals below.</CardDescription>
              </CardHeader>
              <CardContent>
                <GoalsForm goals={goals} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
