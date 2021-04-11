import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
 
export type RouteDocument = Route & Document;

@Schema()
export class Route {

    @Prop()
    _id: string;

    @Prop()
    title: string;
    
    @Prop(
        raw({
            lat: { type: Number },
            lon: { type: Number }
        })
    )
    startPosition: {
        lat: number,
        lon: number,
    }

    @Prop(
        raw({
            lat: { type: Number },
            lon: { type: Number }
        })
    )
    endPosition: {
        lat: number,
        lon: number,
    }

}

export const RouteSchema = SchemaFactory.createForClass(Route);