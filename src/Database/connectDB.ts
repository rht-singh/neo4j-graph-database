import neo4j from "neo4j-driver";

export async function executeQuery(statement: string, params: {}) {
    const driver = neo4j.driver(`neo4j://localhost:7687`, neo4j.auth.basic('neo4j', 'not7this'), {
        maxConnectionLifetime: 3 * 60 * 60 * 1000,
        maxConnectionPoolSize: 50,
        connectionAcquisitionTimeout: 2 * 60 * 1000,
        disableLosslessIntegers: true
    });
    const session = driver.session()
    try {

        const result = await session.run(statement, params);
        return result;
    }
    catch (err) {
        throw err
    }
    finally {
        session.close();
    }
}

export function formatResponse(resultObj: any) {
    const result: any[] = [];
    if (resultObj.records.length > 0) {
        resultObj.records.map((record: { _fields: { properties: any; }[]; }) => {
            result.push(record._fields[0].properties);
        });
    }
    return result;
}

