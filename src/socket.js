export default (io)=>{
    io.on("connection", (socket)=>{
        console.log(`Usuario Conectado ${socket.id}`);



    })
}