'use client';

import AnnouncementComponent from "./AnnouncementComponent";
import CollectionComponent from "./CollectionComponent";
import FeaturedSliderComponent from "./FeaturedSliderComponent";
import HeroComponent from "./HeroComponent";
import PressComponent from "./PressComponent";
import SupportComponent from "./SupportComponent";
import VisitComponent from "./VisitComponent";

export default function HomeComponent({ data }: { data: any }) {

  return (
    <div>
        <div>
            {data.modules && data.modules.map((module: any, index: number) => {
                switch (module._type) {
                    case 'hero.home':
                        return <HeroComponent key={index} data={module} />;
                    case 'module.featuredSlider':
                        return <FeaturedSliderComponent key={index} data={module} />;
                    case 'module.collection':
                        return <CollectionComponent key={index} data={module} />;
                    case 'module.press':
                        return <PressComponent key={index} data={module} />;
                    case 'module.visit':
                        return <VisitComponent key={index} data={module} />;
                    case 'module.support':
                        return <SupportComponent key={index} data={module} />; 
                    case 'module.announcement':
                        return <AnnouncementComponent key={index} data={module} />;                      
                    default:
                        return null;
                }
            })}
        </div>
    </div>
  )
}