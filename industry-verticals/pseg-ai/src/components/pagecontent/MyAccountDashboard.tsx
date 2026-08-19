import type { JSX, ReactNode } from 'react';
import { ComponentProps } from 'lib/component-props';

type MyAccountDashboardProps = ComponentProps;

type DashboardCardProps = {
  title: string;
  area: string;
  children: ReactNode;
  headerExtra?: ReactNode;
};

type EnergyRowProps = {
  icon: ReactNode;
  label: string;
  percent: string;
  trend: 'less' | 'more';
};

type ServiceRowProps = {
  isEnrolled: boolean;
  label: string;
  action: string;
};

const CalendarIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 9h18" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 3v4M16 3v4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const PlugIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M9 7V3M15 7V3M8 7h8v5a4 4 0 0 1-3 3.87V19h2v2h-6v-2h2v-3.13A4 4 0 0 1 8 12V7Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FlameIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 3c2 3.2 1.2 5.4 0 7 2.4-.4 5 1.2 5 4.6A5 5 0 0 1 7 14.4C7 10.8 10 8.6 12 3Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const TrendArrow = ({ direction }: { direction: 'less' | 'more' }): JSX.Element => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    {direction === 'less' ? (
      <path d="M12 5v14M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </svg>
);

const CheckIcon = ({ isActive }: { isActive: boolean }): JSX.Element => (
  <span className={`my-account-dashboard-check${isActive ? ' is-active' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M6 12.5 10.2 17 18 8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const ChevronDown = (): JSX.Element => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DashboardCard = ({ title, area, children, headerExtra }: DashboardCardProps): JSX.Element => (
  <article className={`my-account-dashboard-card my-account-dashboard-card--${area}`}>
    <header className="my-account-dashboard-card-header">
      <h2>{title}</h2>
      {headerExtra}
    </header>
    {children}
  </article>
);

const EnergyRow = ({ icon, label, percent, trend }: EnergyRowProps): JSX.Element => (
  <div className="my-account-dashboard-energy-row">
    <div className="my-account-dashboard-energy-service">
      <span className="my-account-dashboard-energy-icon">{icon}</span>
      <span>{label}</span>
    </div>
    <div className="my-account-dashboard-energy-usage">
      <span>You used</span>
      <strong>{percent}</strong>
    </div>
    <div className={`my-account-dashboard-energy-trend is-${trend}`}>
      <span className="my-account-dashboard-energy-trend-label">
        <TrendArrow direction={trend} />
        {trend === 'less' ? 'LESS' : 'MORE'}
      </span>
      <span>
        {label} compared to this month last year
      </span>
    </div>
  </div>
);

const ServiceRow = ({ isEnrolled, label, action }: ServiceRowProps): JSX.Element => (
  <div className="my-account-dashboard-service">
    <div className="my-account-dashboard-service-label">
      <CheckIcon isActive={isEnrolled} />
      <span>{label}</span>
    </div>
    <button type="button" className="my-account-dashboard-text-link">
      {action} <span aria-hidden="true">&gt;</span>
    </button>
  </div>
);

export const Default = (props: MyAccountDashboardProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section className={`component my-account-dashboard ${sxaStyles}`} id={id ? id : undefined}>
      <div className="my-account-dashboard-inner">
        <header className="my-account-dashboard-page-header">
          <div>
            <p className="my-account-dashboard-eyebrow">My Account</p>
            <h1>My Account Dashboard</h1>
          </div>
          <button type="button" className="my-account-dashboard-appointments">
            <CalendarIcon />
            <span>My Appointments (0)</span>
          </button>
        </header>

        <div className="my-account-dashboard-grid">
          <DashboardCard
            title="Your Bill"
            area="bill"
            headerExtra={
              <p className="my-account-dashboard-days-left">
                <strong>0</strong> Days Left
              </p>
            }
          >
            <p className="my-account-dashboard-period">Your billing period 01/01/2026 - 01/31/2026</p>
            <div className="my-account-dashboard-amount">
              <div>
                <span>Amount due</span>
                <strong>$0.00</strong>
              </div>
              <p>You are enrolled in Automatic Bill Pay.</p>
            </div>
            <div className="my-account-dashboard-actions">
              <button type="button" className="my-account-dashboard-btn my-account-dashboard-btn-primary">
                Pay Bill Now
              </button>
              <div className="my-account-dashboard-actions-split">
                <button type="button" className="my-account-dashboard-btn my-account-dashboard-btn-outline">
                  Bill Details
                </button>
                <button type="button" className="my-account-dashboard-btn my-account-dashboard-btn-outline">
                  Download Bill
                  <ChevronDown />
                </button>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Your Energy Use" area="energy">
            <div className="my-account-dashboard-energy">
              <EnergyRow icon={<PlugIcon />} label="Electric" percent="9.6%" trend="less" />
              <EnergyRow icon={<FlameIcon />} label="Gas" percent="16.7%" trend="more" />
            </div>
            <div className="my-account-dashboard-energy-footer">
              <p>
                Next Meter Reading <strong>02/15/2026</strong>
              </p>
              <button type="button" className="my-account-dashboard-btn my-account-dashboard-btn-outline">
                Submit Meter Reading
              </button>
            </div>
          </DashboardCard>

          <DashboardCard title="Account Details" area="account">
            <div className="my-account-dashboard-profile">
              <p className="my-account-dashboard-name">John Doe</p>
              <p>123 Main St</p>
              <p>Anytown, NJ 00000</p>
              <p>Acct. # XXXXXXXXXX</p>
            </div>
            <div className="my-account-dashboard-services">
              <ServiceRow isEnrolled label="Automatic Bill Pay" action="View Details" />
              <ServiceRow isEnrolled={true} label="Equal Payment Plan" action="Enroll" />
              <ServiceRow isEnrolled label="Paperless Billing" action="View Details" />
            </div>
            <button type="button" className="my-account-dashboard-text-link my-account-dashboard-profile-link">
              Manage Profile <span aria-hidden="true">&gt;</span>
            </button>
            <button type="button" className="my-account-dashboard-btn my-account-dashboard-btn-outline">
              Change Account
            </button>
          </DashboardCard>

          <DashboardCard title="Verify your usage data" area="verify">
            <div className="my-account-dashboard-verify">
              <p>
                Now you can spot trends, track your usage, and even receive energy related alerts
                to help you stay informed.
              </p>
              <button type="button" className="my-account-dashboard-btn my-account-dashboard-btn-primary">
                My Meter
              </button>
            </div>
          </DashboardCard>

          <DashboardCard title="My Alerts" area="alerts">
            <div className="my-account-dashboard-alert">
              <span>Power Outage</span>
              <span className="my-account-dashboard-toggle" role="status" aria-label="Power Outage alerts on">
                <span className="my-account-dashboard-toggle-knob" aria-hidden="true" />
                ON
              </span>
            </div>
          </DashboardCard>
        </div>
      </div>
    </section>
  );
};
