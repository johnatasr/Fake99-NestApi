import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Inject, 
  OnModuleInit } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
// import { RoutesGateway } from './routes.gateway';

@Controller('routes')
export class RoutesController implements OnModuleInit {

  private kafkaProducer: Producer

  constructor(
    private readonly routesService: RoutesService,
    @Inject('KAFKA_SERVICE')
    private kafkaClient: ClientKafka,
    // private routeGateway: RouteGateway

    ) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @Get()
  findAll() {
    return this.routesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routesService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routesService.remove(+id);
  }

  async onModuleInit() {
    this.kafkaProducer = await this.kafkaClient.connect()
  }

  @Get(':id/start')
  startRoute(@Param('id') id: string) {
    console.log("estamos aqui haha")
    this.kafkaProducer.send({
      topic: 'new-direction',
      messages: [
        {
          key: 'new-direction',
          value: JSON.stringify({ routeId: id, clientId: '' })
        },
      ],
    });

    console.log("mesg enviada")
  }

  @MessagePattern('new-position')
  consumePosition(
    @Payload()
    message: {
      value: {
        routeId: string;
        clientId: string;
        position: [number, number];
        finished: boolean;
      }
    }
  ){
    console.log(message)
  }

}
