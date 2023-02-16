import amqplib from "amqplib";

export class Publisher{
    channel;

    async createChannel(){
        const connection = await amqplib.connect("amqp://localhost");
        this.channel = await connection.createChannel();
    }

    async publishMessage(routingKey, message){
        if( !this.channel ) {
            await this.createChannel()
        }
        await this.channel.assertExchange('logExchange', 'direct');
        await this.channel.publish('logExchange', routingKey, Buffer.from(JSON.stringify({logType: routingKey, message, dateTime: new Date()})));
        console.log(`${message} has bent send to exchange logExchange`);
    }

}