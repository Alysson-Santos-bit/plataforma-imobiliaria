import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';

// PartialType faz com que todas as propriedades de CreatePropertyDto sejam opcionais.
export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {}

