import { TelegramClient } from './telegram-client.js';
import { BotStorage } from './bot-storage.js';
import { ApprovalService } from './approval-service.js';
import { CommandRouter } from './command-router.js';
import { UpdateLoop } from './update-loop.js';
export class BotRunner { storage:BotStorage; approvals:ApprovalService; loop?:UpdateLoop; constructor(storage=new BotStorage()){ this.storage=storage; this.approvals=new ApprovalService(storage); } start(token=this.storage.secrets.botToken){ if(!token) throw new Error('BOT_TOKEN_REQUIRED'); const client=new TelegramClient(token); const router=new CommandRouter(this.storage,this.approvals,(chatId,text)=>client.sendMessage(chatId,text)); this.loop=new UpdateLoop(client,this.storage,router); this.loop.start(); } stop(){ this.loop?.stop(); } }
