import { Router } from "express";
import { controllers } from '../controllers/neo4j.controllers';

const router = Router();

router.get('/user', controllers.create);
router.get('/users', controllers.getAllUser);
router.get('/user/:id', controllers.getUser);
router.get('/delete/:id', controllers.deleteUser);
export = router;