export class RateLimiter {
    private queue: Promise<void> = Promise.resolve();

    constructor(private intervalMs: number) { }

    async wait() {
        this.queue = this.queue.then(async () => {
            await new Promise(r => setTimeout(r, this.intervalMs));
        });

        await this.queue;
    }
}