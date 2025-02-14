import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  PanInfo,
} from "framer-motion";
import Image from 'next/image';

const IMGS: string[] = [
  
  "https://cdn.prod.website-files.com/671131cc369974c40573c59d/67ae8cc35ec0ee71428f237d_IMG_8295.jpg",
  "https://cdn.prod.website-files.com/671131cc369974c40573c59d/67ae8cbfcc55322904128a9c_IMG_8118.jpg",
  "https://cdn.prod.website-files.com/671131cc369974c40573c59d/67ae8cbb9edac47d35763d61_IMG_8363.jpg",
  "https://cdn.prod.website-files.com/671131cc369974c40573c59d/67ae8d522d4ae0d4dd7fcf0c_IMG_7270.jpg",
  "https://cdn.prod.website-files.com/671131cc369974c40573c59d/67ae8de627a950ad810693e9_IMG_5432.jpg",
  "https://cdn.prod.website-files.com/671131cc369974c40573c59d/67ae8de60f35b234b7bdfd94_IMG_5209.jpg",
  "https://cdn.prod.website-files.com/671131cc369974c40573c59d/67ae8de65ccb44e34da4edb7_IMG_3354.jpg",
  "https://cdn.prod.website-files.com/671131cc369974c40573c59d/67ae8de6e84ece7dab5c4445_IMG_4678.jpg",

];

interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images?: string[];
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}) => {
  // Use default images if none are provided
  const galleryImages = images.length > 0 ? images : IMGS;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(
    window.innerWidth <= 640
  );
  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Adjust cylinder and face dimensions
  const cylinderWidth: number = isScreenSizeSm ? 800 : 1200;
  const faceCount: number = galleryImages.length;
  const faceWidth: number = (cylinderWidth / faceCount) * 1.5;
  const radius: number = cylinderWidth / (2 * Math.PI);

  // Framer Motion values and controls
  const dragFactor: number = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  // Create a 3D transform based on the rotation motion value
  const transform = useTransform(
    rotation,
    (val: number) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle: number) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const handleUpdate = (latest: { rotateY?: number }) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_: never, info: PanInfo): void => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: never, info: PanInfo): void => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = (): void => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = (): void => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[400px] w-full max-w-5xl mx-auto overflow-hidden">
      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {galleryImages.map((url, i) => (
            <div
              key={url}
              className="group absolute flex h-fit items-center justify-center p-[4%] [backface-visibility:hidden]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
            >
              <Image
                src={url}
                alt="gallery"
                width={300}
                height={200}
                className="pointer-events-none rounded-[15px] border-[3px] border-white object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
