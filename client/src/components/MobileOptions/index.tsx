import { Dispatch, FC, SetStateAction } from 'react'
import { mobileOptionCards } from '@share/data/mobile_option_cards'
import styles from './index.module.scss'
import ProfileHeader from './ProfileHeader/ProfileHeader'
import SlidingLeftModal from '@ui/Modals/SlidingLeftModal/SlidingLeftModal'
import OptionCard from './OptionCard/OptionCard'

interface IMobileOptions {
    isOpen: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const MobileOptions: FC<IMobileOptions> = ({ isOpen, setOpen }) => {
    return (
        <SlidingLeftModal isOpen={isOpen} setOpen={setOpen}>
            <div className={styles.wrapper}>
                <ProfileHeader setMobileOptionsOpen={setOpen} />
                <div className={styles.container}>
                    {mobileOptionCards.map(card => {
                        return (
                            <OptionCard
                                key={card.id}
                                Icon={card.icon}
                                settings={card.settings}
                                rightIcon={card.rightIcon}
                            >
                                {card.text}
                            </OptionCard>
                        )
                    })}
                </div>
            </div>
        </SlidingLeftModal>
    )
}

export default MobileOptions
