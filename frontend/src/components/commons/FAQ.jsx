import {useState} from "react";

export default function FAQ() {

  const ploggingFAQ = [
    {
      heading: "What is Plogging?",
      description: "Plogging is a fitness and environmental activity that combines jogging with picking up litter. It's a fun and impactful way to stay active while contributing to a cleaner environment."
    },
    {
      heading: "How can I join a Plogging event?",
      description: "Joining a Plogging event is easy! Check our calendar for upcoming events in your area. Simply show up on the designated day with comfortable clothing, sturdy shoes, and a pair of gloves. Participation is free!"
    },
    {
      heading: "Do I need to register for events?",
      description: "Registration is not mandatory, but it helps us plan for the number of participants. You can register for events on our website or simply join us on the day of the event."
    },
    {
      heading: "Can groups participate in Plogging events?",
      description: "Absolutely! We encourage groups from schools, associations, organizations, and friends to join our events. It's an excellent opportunity to bond, strengthen relationships, and contribute to a healthier community."
    },
    {
      heading: "Is there an age limit for participation?",
      description: "Plogging is inclusive, and participants of all ages are welcome! We encourage families, youth, and seniors to join us in making a positive impact."
    },
    {
      heading: "What do I need to bring to a Plogging event?",
      description: "Come with comfortable clothing, suitable shoes for jogging, and a pair of gloves. We provide bags for collecting litter."
    },
    {
      heading: "How often do you organize Plogging events?",
      description: "We organize events every Saturday and Sunday. Check our calendar for specific dates and locations."
    },
    {
      heading: "Can I organize a Plogging event in my area?",
      description: "Absolutely! We welcome individuals and groups to organize Plogging events. Reach out to us, and we'll provide guidance and support."
    },
    {
      heading: "Do you provide certificates or recognition for participants?",
      description: "While we don't provide certificates, we appreciate and recognize the efforts of all participants. Your contribution to a cleaner environment is a reward in itself!"
    },
    {
      heading: "How can I stay updated on upcoming events and news?",
      description: "Stay connected by following us on social media, and regularly check our website for updates, event announcements, and inspiring stories."
    },
  ]

  const [indexState, indexStateChange] = useState(0)


  return (
    <div
    data-aos="fade-down"

     className="w-[90%] flex flex-col gap-5">

      <h1 className="text-5xl mb-10">
        FAQ?
      </h1>

      {
        ploggingFAQ.map((faq, index) => (
          <div key={index} className="w-full text-left">
            <div
              onClick={()=>{
                if (indexState === index){
                  indexStateChange(-1)
                  return
                }
                indexStateChange(index)
              }}
              className={"cursor-pointer bg-green-500/20 w-full px-5 py-2 flex justify-between"}
            >
              {
                faq.heading
              }
              <p>
                {
                  indexState === index ? "-" : "+"
                }
              </p>
            </div>
            <div
              className="w-full px-5"
              style={{
                display: indexState === index ? "block" : "none"
              }}
            >
              {
                faq.description
              }
            </div>
          </div>
        ))
      }

    </div>
  )
}