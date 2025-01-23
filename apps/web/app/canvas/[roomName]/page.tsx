import WsConnection from "../../components/WsConnection";

export default async function Room({params}: {params: Promise<{roomName: string}>}) {

    const roomId = (await params).roomName;
    
    console.log(`page${roomId}`); 

    return <WsConnection roomId={roomId} />;
    
}