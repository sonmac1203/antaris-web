import { createAmazonService } from '@/lib/pa/amazon';

const handler = async (req, res) => {
  const { state } = req.query;
  if (!state) {
    return;
  }
  const amazonService = createAmazonService('lwa');
  await amazonService.login(res, 'profile', state);
};

export default handler;
