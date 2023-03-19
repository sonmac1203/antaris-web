import { createAmazonService } from '@/core/utils/amazon';

const handler = async (req, res) => {
  const { auth_type: type } = req.query;
  if (type !== 'lwa' && type !== 'alexa') {
    return;
  }
  const amazonService = createAmazonService(type);
  await amazonService.login(res, 'profile');
};

export default handler;
