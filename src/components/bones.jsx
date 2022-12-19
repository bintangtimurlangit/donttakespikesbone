import Bone from './bone';

export default function Bones(props) {
  const { bones, onBoneTaken } = props;

  const splittedBones = bones.reduce((acc, bone) => {
    const index = bone.side;
    acc[index] = acc[index] ? [...acc[index], bone] : [bone];
    return acc;
  }, []);

  return (
    <div className="grid flex-1 grid-cols-5">
      {
        splittedBones.map((sideBones, index) => (
          <div key={`side-${index}`} className="flex h-full min-h-[80px] items-center justify-center first:col-span-5 [&:nth-of-type(3)]:order-4 [&:nth-of-type(3)]:flex-col [&:nth-of-type(4)]:order-5 [&:nth-of-type(4)]:col-span-5 [&:nth-of-type(2)]:flex-col">
            {sideBones.map(({
              isBomb, taken, side, id,
            }, sideIndex) => (
              <Bone
                key={`bone-${side}-${sideIndex}`}
                taken={taken}
                isBomb={isBomb}
                onClick={() => onBoneTaken(id, isBomb)}
              />
            ))}
          </div>
        ))
      }
      <div className="relative order-3 col-span-3 flex h-56 justify-center p-10">
        <img src="./dog_sleep.png" className="aspect-square h-full" alt="dog sleeping" />
      </div>
    </div>
  );
}
