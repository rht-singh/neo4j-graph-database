import { formatResponse, executeQuery } from '../Database/connectDB';
import { Response, Request, NextFunction } from 'express';

class CRUD {
    async create(req: Request, res: Response) {
        try {
            const { id, name, email } = req.query;
            if (!id || !name || !email) {
                return res.status(404).json({ is_success: false, message: "Invalid inputs" })
            }
            else {
                const query = `CREATE (n:Users {id:$id, name:$name, email: $email}) RETURN n`
                const resultObj = await executeQuery(query, req.query);
                const result = formatResponse(resultObj);
                res.send(result);

            }
        }
        catch (err) {
            throw err
        }
    }
    async getAllUser(req: Request, res: Response) {
        try {
            const query = 'MATCH (n) RETURN n LIMIT 100';
            const params = {};
            const resultObj = await executeQuery(query, params);
            const result = formatResponse(resultObj);
            res.send(result);
        }
        catch (err) { throw err }
    }

    async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const query = `MATCH (n:Users {id:$id}) RETURN n LIMIT 10`;
            const resultObj = await executeQuery(query, req.params);
            const result = formatResponse(resultObj);
            res.send(result);
        }
        catch (err) { throw err }
    }
    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const query = `MATCH(n:Users {id:$id}) DELETE n`;
            const resultObj = executeQuery(query, req.params);
            res.send('Deleted successfully')
        }
        catch (err) { throw err }
    }
}

export const controllers = new CRUD();