export class WorkerPool {
    constructor(private concurrency: number) { }

    async run<T>(
        items: T[],
        worker: (item: T, index: number) => Promise<void>
    ) {
        const queue = items.map((item, index) => ({
            item,
            index,
        }));

        const total = queue.length;

        console.log(
            `[WORKER] start total=${total} concurrency=${this.concurrency}`
        );

        const workers = Array.from(
            { length: this.concurrency },
            (_, workerId) =>
                (async () => {
                    console.log(
                        `[WORKER-${workerId + 1}] started`
                    );

                    while (queue.length > 0) {
                        const current = queue.shift();

                        if (!current) {
                            break;
                        }

                        const { item, index } = current;

                        try {
                            console.log(
                                `[WORKER-${workerId + 1}] processing ${index + 1}/${total}`
                            );

                            await worker(item, index);

                            console.log(
                                `[WORKER-${workerId + 1}] done ${index + 1}/${total}`
                            );
                        } catch (error) {
                            console.error(
                                `[WORKER-${workerId + 1}] failed ${index + 1}/${total}`,
                                error
                            );
                        }
                    }

                    console.log(
                        `[WORKER-${workerId + 1}] finished`
                    );
                })()
        );

        await Promise.all(workers);

        console.log("[WORKER] all workers finished");
    }
}