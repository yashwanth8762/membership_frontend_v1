import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Organization = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  return (
    <section id="organization" className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3">
            {user.language ? 'Our Organization' : 'ನಮ್ಮ ಸಂಸ್ಥೆ'}
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            {user.language 
              ? 'Understanding the structure and composition of Karnataka Madara Mahasabha Executive Committee.'
              : 'ಕರ್ನಾಟಕ ಮಾದರ ಮಹಾಸಭೆ ಕಾರ್ಯಕಾರಿ ಸಮಿತಿಯ ರಚನೆ ಮತ್ತು ಸಂಯೋಜನೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು.'
            }
          </p>
        </div>

        {/* Executive Committee Information */}
        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border border-gray-100">
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-sm lg:text-base">
              {user.language 
                ? 'The number of Central Executive Members, including all districts and Bangalore Urban, will be a total of 45 members. Among them, the Executive Committee has the authority to nominate 3 members.'
                : 'ಕೇಂದ್ರ ಕಾರ್ಯಕಾರಿ ಸದಸ್ಯರ ಸಂಖ್ಯೆ ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳಿಂದ ಬೆಂಗಳೂರು ನಗರ ಸೇರಿ ಒಟ್ಟು 45 ಜನ ಆಗಿರುತ್ತದೆ. ಅದರಲ್ಲಿ ಮೂರು ಜನ ನಾಮಕರಣ ಮೂಲಕ ಸದಸ್ಯರನ್ನು ಆಯ್ಕೆ ಮಾಡಿಕೊಳ್ಳುವ ಅಧಿಕಾರ ಕಾರ್ಯಕಾರಿ ಸಮಿತಿಗೆ ಇರತ್ತದೆ.'
              }
            </p>
            
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-sm lg:text-base font-medium text-blue-900">
                {user.language 
                  ? 'One of these nominated members must compulsorily be a lawyer, should have earned recognition for contributions to social work, and must possess a good character.'
                  : 'ಈ ಸದಸ್ಯರಲ್ಲಿ ಒಬ್ಬ ಸದಸ್ಯನು ಕಡ್ಡಾಯವಾಗಿ ವಕೀಲರಾಗಿದ್ದು, ಸಮಾಜದ ಕೆಲಸ ಕಾರ್ಯಗಳಲ್ಲಿ ಗುರುತಿಸಿಕೊಂಡಿರಬೇಕು ಹಾಗೂ ಉತ್ತಮ ವ್ಯಕ್ತಿತ್ವ ಉಳ್ಳವರಾಗಿರಬೇಕು.'
                }
              </p>
            </div>
            
            <p className="text-sm lg:text-base">
              {user.language 
                ? 'The remaining two positions will be filled by nomination from castes within the Madiga community that have not already been represented.'
                : 'ಪರ್ಯಾಯ ಉಳಿದ ಎರಡು ಸ್ಥಾನಗಳು ಮಾದಿಗ ಸಮಾಜದ ವರ್ಗದಿಂದ ನಾಮಕರಣ ಪ್ರತಿನಿಧಿಸಿಲ್ಲದವರ ಜಾತಿಗಳಿಂದ ಮಾಡಲಾಗುತ್ತದೆ.'
              }
            </p>
            
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
              <p className="text-sm lg:text-base font-medium text-green-900">
                {user.language 
                  ? 'The Executive Committee members are directly elected by voting conducted from time to time by the members of the Central, District, and Taluk Committees.'
                  : 'ಕಾರ್ಯಕಾರಿ ಸಮಿತಿಯ ಸದಸ್ಯರು ನೇರವಾಗಿ ಕಾಲಕಾಲಕ್ಕೆ ನಡೆಯುವ ಚುನಾವಣೆಗೆ ಕೇಂದ್ರ, ಜಿಲ್ಲೆ ಮತ್ತು ತಾಲ್ಲೂಕು ಸಮಿತಿ ಸದಸ್ಯರು ಮಾಡುವ ಮತದಾನದಿಂದ ಆರಿಸಿಬರುತ್ತಾರೆ.'
                }
              </p>
            </div>
          </div>
        </div>
          <div className="text-center mt-4">
            <button onClick={()=>{navigate("/organization")}} className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white mt-6 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm">
              {user.language ? 'Learn More' : 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ'}
            </button>
          </div>
        {/* </div> */}
      </div>
    </section>
  )
}

export default Organization
