import { Resolver, Query, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';


@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

 @UseGuards(GqlAuthGuard)
@Query(() => [Task])
myTasks(@Context() ctx: any) {
  const userId = ctx.req.user?.userId;  // FIXED
  return this.tasksService.findAllForUser(userId);
}


@Mutation(() => Task)
@UseGuards(GqlAuthGuard)
createTask(
  @Args('input') input: CreateTaskInput,
  @Context() ctx: any,
) {
  const userId = ctx.req.user?.id ?? ctx.req.user?.userId ?? ctx.req.user?.sub;

  console.log("USER ID =", userId);

  return this.tasksService.createTask(input, userId);
}



@Mutation(() => String)
testInput(@Args('input') input: CreateTaskInput) {
  console.log("TEST INPUT =", input);
  return "OK";
}



@UseGuards(GqlAuthGuard)
  @Mutation(() => Task)
  toggleTask(
    @Args('id', { type: () => Int }) id: number,
    @Context() ctx: any,
  ) {
   const userId = ctx.req.user?.userId;   // FIXED

    return this.tasksService.toggleTask(userId, id);
  }

@UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  deleteTask(
    @Args('id', { type: () => Int }) id: number,
    @Context() ctx: any,
  ) {
    const userId = ctx.req.user?.userId;   // FIXED

    return this.tasksService.deleteTask(userId, id);
  }
}
