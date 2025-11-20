import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  @IsNotEmpty()
  title!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string | null;
}
