import React from 'react';

export const Disclaimer: React.FC = () => (
  <section className='mx-10 flex flex-col items-center justify-center last:mb-0 lg:mx-0'>
    <div className='w-full text-4xl md:max-w-7xl'>
      <p className='mb-8 text-7xl md:text-8xl'>Disclaimer</p>
      <>
        <p className='mb-4 text-5xl'>Liability for Contents</p>

        <p className='mb-4 text-gray-300'>
          As service providers, we are liable for own contents of these websites
          according to Sec. 7, paragraph 1 German Telemedia Act (TMG). However,
          according to Sec. 8 to 10 German Telemedia Act (TMG), service
          providers are not obligated to permanently monitor submitted or stored
          information or to search for evidences that indicate illegal
          activities.
        </p>

        <p className='mb-10 text-gray-300'>
          Legal obligations to removing information or to blocking the use of
          information remain unchallenged. In this case, liability is only
          possible at the time of knowledge about a specific violation of law.
          Illegal contents will be removed immediately at the time we get
          knowledge of them.
        </p>
      </>
      <>
        <p className='mb-4 text-5xl'>Liability for Links</p>

        <p className='mb-4 text-gray-300'>
          Our offer includes links to external third party websites. We have no
          influence on the contents of those websites, therefore we cannot
          guarantee for those contents. Providers or administrators of linked
          websites are always responsible for their own contents.
        </p>

        <p className='mb-10 text-gray-300'>
          The linked websites had been checked for possible violations of law at
          the time of the establishment of the link. Illegal contents were not
          detected at the time of the linking. A permanent monitoring of the
          contents of linked websites cannot be imposed without reasonable
          indications that there has been a violation of law. Illegal links will
          be removed immediately at the time we get knowledge of them.
        </p>
      </>
      <>
        <p className='mb-4 text-5xl'>Copyright</p>

        <p className='mb-4 text-gray-300'>
          Contents and compilations published on these websites by the providers
          are subject to German copyright laws. Reproduction, editing,
          distribution as well as the use of any kind outside the scope of the
          copyright law require a written permission of the author or
          originator. Downloads and copies of these websites are permitted for
          private use only.
        </p>

        <p className='mb-4 text-gray-300'>
          The commercial use of our contents without permission of the
          originator is prohibited.
        </p>

        <p className='text-gray-300'>
          Copyright laws of third parties are respected as long as the contents
          on these websites do not originate from the provider. Contributions of
          third parties on this site are indicated as such. However, if you
          notice any violations of copyright law, please inform us. Such
          contents will be removed immediately.
        </p>
      </>
    </div>
  </section>
);
export default Disclaimer;
