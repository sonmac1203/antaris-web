import Link from 'next/link';

export const LoginWithAmazonButton = () => {
    const connectRoute = '/api/amazon/connect';

    return (
        <Link href={connectRoute}>
            <a id='LoginWithAmazon'>
                <img
                    border='0'
                    alt='Login with Amazon'
                    src='https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png'
                    width='156'
                    height='32'
                />
            </a>
        </Link>
    );
};
