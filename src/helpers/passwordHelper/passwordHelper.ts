import {IPassword} from './passwordInterface';
import {compare, hash} from 'bcrypt';

export class Password implements IPassword {
    
    async encrypt(password: string): Promise<string>{
        return await hash(password, 10);
    }

    async decrypt(hashedPassword: string, unHashedPassword: string): Promise<boolean>{
        return await compare(hashedPassword, unHashedPassword);
    }
}