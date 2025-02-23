import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';

export function Sandbox() {

    return (
        <Layout>
            <p className="text-red-500">Sandbox</p>
            <div className='flex justify-between'>
                <div>
                    <a href="/game-builder">
                        <Button>Retour</Button>
                    </a>
                </div>
            </div>
        </Layout>
    );
}
