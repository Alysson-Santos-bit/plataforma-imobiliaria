import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

// @UseGuards(JwtAuthGuard) // <--- REMOVA O GUARDA DAQUI
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // <--- ADICIONE O GUARDA AQUI (APENAS PARA ESTE MÉTODO)
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get() // <--- ROTA PÚBLICA - Não precisa de guarda
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get(':id') // <--- ROTA PÚBLICA - Não precisa de guarda
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertiesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // <--- ADICIONE O GUARDA AQUI
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // <--- ADICIONE O GUARDA AQUI
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertiesService.remove(id);
  }
}