import { IsNotEmpty } from 'class-validator';

export class CreateKeyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  org_id: string;

  @IsNotEmpty()
  value: string;

  @IsNotEmpty()
  project_id: number;
}
