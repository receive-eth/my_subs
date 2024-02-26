import { IPayload } from '@/dto/user.dto'
import { Request } from 'express'

export interface RequestWithDecryptedData extends Request {
    decryptedData?: IPayload
}
